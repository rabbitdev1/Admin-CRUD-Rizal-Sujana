import { Input, Textarea } from '@heroui/input';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/modal';
import { Button, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import { useEffect, useState } from 'react';
import DefaultLayout from '../layouts/default';
import axios from 'axios';

export default function StockPage() {
  const [stocks, setStocks] = useState([]);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(''); // 'create', 'edit', 'delete'
  const [selectedStock, setSelectedStock] = useState(null);
  const [newStock, setNewStock] = useState({
    produk_id: '',
    kuantitas: '',
  });

  const fetchStock = async () => {
    const res = await fetch('http://localhost:5000/stock');
    const data = await res.json();
    setStocks(data);
  };

  useEffect(() => {
    // Fetch list of products for select dropdown
    axios
      .get('http://localhost:5000/produk')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Terjadi kesalahan:', err));

    // Fetch stock data
    fetchStock();
  }, []);

  const handleCreate = async () => {
    const body = new URLSearchParams();
    body.append('produk_id', newStock.produk_id);
    body.append('kuantitas', newStock.kuantitas);

    await fetch('http://localhost:5000/stock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });

    setShowModal(false);
    setNewStock({ produk_id: '', kuantitas: '' });
    fetchStock();
  };

  const handleUpdate = async () => {
    const body = new URLSearchParams();
    body.append('produk_id', selectedStock.produk_id);
    body.append('kuantitas', selectedStock.kuantitas);

    await fetch(`http://localhost:5000/stock/${selectedStock.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });

    setShowModal(false);
    fetchStock();
  };

  const handleDelete = async () => {
    await fetch(`http://localhost:5000/stock/${selectedStock.id}`, {
      method: 'DELETE',
    });

    setShowModal(false);
    fetchStock();
  };

  const handleEdit = (stock) => {
    setSelectedStock({ ...stock });
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
        <h2 className="text-2xl font-semibold mb-4">📦 Data Stok Produk</h2>

        <div className="flex justify-end mb-3">
          <Button onPress={handleAdd} color="primary">
            Tambah Stok
          </Button>
        </div>

        <Table isStriped removeWrapper>
          <TableHeader>
            <TableColumn>ID Produk</TableColumn>
            <TableColumn>Kuantitas</TableColumn>
            <TableColumn>Aksi</TableColumn>
          </TableHeader>
          <TableBody emptyContent="Tidak ada stok tersedia.">
            {stocks.map((stock) => (
              <TableRow key={stock.id}>
                <TableCell>{stock.produk_id}</TableCell>
                <TableCell>{stock.kuantitas}</TableCell>
                <TableCell className="flex gap-2">
                  <Button size="sm" color="warning" onClick={() => handleEdit(stock)}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    color="danger"
                    onPress={() => {
                      setSelectedStock(stock);
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

        {/* Modal */}
        <Modal isOpen={showModal} onOpenChange={() => setShowModal(false)}>
          <ModalContent>
            {modalAction === 'create' && (
              <>
                <ModalHeader>Tambah Stok</ModalHeader>
                <ModalBody className="gap-3">
                  <Select
                    label="Pilih Produk"
                    value={newStock.produk_id}
                    onChange={(e) => setNewStock({ ...newStock, produk_id: e.target.value })}
                  >
                    <SelectItem value="">Pilih Produk</SelectItem>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.nama}
                      </SelectItem>
                    ))}
                  </Select>
                  <Input
                    label="Kuantitas"
                    type="number"
                    value={newStock.kuantitas}
                    onChange={(e) => setNewStock({ ...newStock, kuantitas: e.target.value })}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={handleCreate}>
                    Simpan
                  </Button>
                </ModalFooter>
              </>
            )}

            {modalAction === 'edit' && selectedStock && (
              <>
                <ModalHeader>Edit Stok</ModalHeader>
                <ModalBody className="gap-3">
                  <Input
                    label="ID Produk"
                    value={selectedStock.produk_id}
                    disabled
                    onChange={(e) => setSelectedStock({ ...selectedStock, produk_id: e.target.value })}
                  />
                  <Input
                    label="Kuantitas"
                    type="number"
                    value={selectedStock.kuantitas}
                    onChange={(e) => setSelectedStock({ ...selectedStock, kuantitas: e.target.value })}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={handleUpdate}>
                    Update
                  </Button>
                </ModalFooter>
              </>
            )}

            {modalAction === 'delete' && selectedStock && (
              <>
                <ModalHeader className="text-red-600">Hapus Stok</ModalHeader>
                <ModalBody>Yakin ingin menghapus stok produk ID {selectedStock.produk_id}?</ModalBody>
                <ModalFooter className="gap-3">
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
