/* eslint-disable no-console */
import { Input, Textarea } from '@heroui/input';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/modal';
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DefaultLayout from '../layouts/default';

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(''); // 'create', 'edit', 'delete'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    nama: '',
    deskripsi: '',
    harga: '',
  });

  useEffect(() => {
    axios
      .get('http://localhost:5000/produk')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Terjadi kesalahan:', err));
  }, []);

  const handleDelete = async () => {
    if (selectedProduct) {
      await axios.delete(`http://localhost:5000/produk/${selectedProduct.id}`);
      setProducts(products.filter((product) => product.id !== selectedProduct.id));
      setShowModal(false);
    }
  };

  const handleCreate = async () => {
    await axios.post('http://localhost:5000/produk', newProduct);
    setProducts([...products, newProduct]);
    setShowModal(false);
    setNewProduct({ nama: '', deskripsi: '', harga: '' });
  };

  const handleUpdate = async () => {
    if (selectedProduct) {
      await axios.put(`http://localhost:5000/produk/${selectedProduct.id}`, selectedProduct);
      setProducts(products.map((p) => (p.id === selectedProduct.id ? selectedProduct : p)));
      setShowModal(false);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct({ ...product });
    setModalAction('edit');
    setShowModal(true);
  };

  const handleAdd = () => {
    setModalAction('create');
    setShowModal(true);
  };

  return (
    <DefaultLayout>
      <section>
        <h2 className="text-2xl font-semibold mb-4">📦 Daftar Produk</h2>

        <div className="flex flex-col gap-3">
          <div className="flex justify-end">
            <Button onPress={handleAdd} color="primary">
              Tambah Produk
            </Button>
          </div>
          {/* Tabel Daftar Produk */}
          <div className="overflow-x-auto shadow-md border-b border-gray-200">
            <Table isStriped removeWrapper>
              <TableHeader>
                <TableColumn>Nama</TableColumn>
                <TableColumn>Deskripsi</TableColumn>
                <TableColumn>Harga</TableColumn>
                <TableColumn>Aksi</TableColumn>
              </TableHeader>
              <TableBody emptyContent="Tidak ada produk tersedia.">
                {products.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.nama}</TableCell>
                    <TableCell>{p.deskripsi}</TableCell>
                    <TableCell>Rp {parseFloat(p.harga).toLocaleString()}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button size="sm" color="warning" onClick={() => handleEdit(p)}>
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        color="danger"
                        onPress={() => {
                          setSelectedProduct(p);
                          setModalAction('delete');
                          setShowModal(true);
                        }}
                      >
                        Hapus
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Modal untuk Create, Edit, Delete */}
        <Modal isOpen={showModal} onOpenChange={() => setShowModal(false)}>
          <ModalContent className=" rounded-xl shadow-xl bg-white max-w-md w-full">
            {/* CREATE */}
            {modalAction === 'create' && (
              <>
                <ModalHeader className="text-xl font-semibold">Tambah Produk Baru</ModalHeader>
                <ModalBody className="gap-3">
                  <Input
                    label="Nama Produk"
                    placeholder="Nama Produk"
                    value={newProduct.nama}
                    onChange={(e) => setNewProduct({ ...newProduct, nama: e.target.value })}
                  />
                  <Textarea
                    label="Deskripsi"
                    placeholder="Deskripsi"
                    value={newProduct.deskripsi}
                    onChange={(e) => setNewProduct({ ...newProduct, deskripsi: e.target.value })}
                  />
                  <Input
                    label="Harga"
                    type="number"
                    placeholder="Harga"
                    value={newProduct.harga}
                    onChange={(e) => setNewProduct({ ...newProduct, harga: e.target.value })}
                  />
                </ModalBody>
                <ModalFooter className="flex justify-end">
                  <Button color="primary" onClick={handleCreate}>
                    Simpan
                  </Button>
                </ModalFooter>
              </>
            )}

            {/* EDIT */}
            {modalAction === 'edit' && selectedProduct && (
              <>
                <ModalHeader className="text-xl font-semibold">Edit Produk</ModalHeader>
                <ModalBody className="space-y-4">
                  <Input
                    label="Nama Produk"
                    placeholder="Nama Produk"
                    value={selectedProduct.nama}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        nama: e.target.value,
                      })
                    }
                  />
                  <Textarea
                    label="Deskripsi"
                    placeholder="Deskripsi"
                    value={selectedProduct.deskripsi}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        deskripsi: e.target.value,
                      })
                    }
                  />
                  <Input
                    label="Harga"
                    type="number"
                    placeholder="Harga"
                    value={selectedProduct.harga}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        harga: e.target.value,
                      })
                    }
                  />
                </ModalBody>
                <ModalFooter className="flex justify-end">
                  <Button color="primary" onClick={handleUpdate}>
                    Update Produk
                  </Button>
                </ModalFooter>
              </>
            )}

            {/* DELETE */}
            {modalAction === 'delete' && selectedProduct && (
              <>
                <ModalHeader className="text-xl font-semibold text-red-600">Hapus Produk</ModalHeader>
                <ModalBody>Apakah Anda yakin ingin menghapus produk {selectedProduct.nama} ?</ModalBody>
                <ModalFooter className="flex justify-end gap-4 pt-4">
                  <Button variant="outline" color="gray" onClick={() => setShowModal(false)}>
                    Batal
                  </Button>
                  <Button color="danger" onClick={handleDelete}>
                    Hapus
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </section>
    </DefaultLayout>
  );
}
