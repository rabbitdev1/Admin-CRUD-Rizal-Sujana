/* eslint-disable no-console */
import { Input, Textarea } from '@heroui/input';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/modal';
import {
  Button,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DefaultLayout from '../layouts/default';

export default function PurchasePage() {
  const [purchases, setPurchases] = useState([]);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(''); // 'create', 'edit', 'delete'
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [newPurchase, setNewPurchase] = useState({
    produk_id: '',
    kuantitas: '',
    status: 'pending',
  });

  const fetchPurchases = async () => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch('http://localhost:5000/pembelian', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const data = JSON.parse(result); // Assuming the result is a JSON string
        setPurchases(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    // Fetch list of products for select dropdown
    fetch('http://localhost:5000/produk', { method: 'GET' })
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Terjadi kesalahan:', err));

    // Fetch purchases data
    fetchPurchases();
  }, []);

  const handleCreate = async () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    const urlencoded = new URLSearchParams();
    urlencoded.append('produk_id', newPurchase.produk_id);
    urlencoded.append('kuantitas', newPurchase.kuantitas);
    urlencoded.append('status', newPurchase.status);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    };

    fetch('http://localhost:5000/pembelian', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        fetchPurchases(); // Refresh the purchases list
      })
      .catch((error) => console.error(error));

    setShowModal(false);
    setNewPurchase({ produk_id: '', kuantitas: '', status: 'pending' });
  };

  const handleUpdate = async () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    const urlencoded = new URLSearchParams();
    urlencoded.append('produk_id', selectedPurchase.produk_id);
    urlencoded.append('kuantitas', selectedPurchase.kuantitas);
    urlencoded.append('status', selectedPurchase.status);

    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    };

    fetch(`http://localhost:5000/pembelian/${selectedPurchase.id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        fetchPurchases(); // Refresh the purchases list
      })
      .catch((error) => console.error(error));

    setShowModal(false);
  };

  const handleDelete = async () => {
    const requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
    };

    fetch(`http://localhost:5000/pembelian/${selectedPurchase.id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        fetchPurchases(); // Refresh the purchases list
      })
      .catch((error) => console.error(error));

    setShowModal(false);
  };

  const handleEdit = (purchase) => {
    setSelectedPurchase({ ...purchase });
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
        <h2 className="text-2xl font-semibold mb-4">🛒 Data Pembelian</h2>

        <div className="flex justify-end mb-3">
          <Button onPress={handleAdd} color="primary">
            Tambah Pembelian
          </Button>
        </div>

        <Table isStriped removeWrapper>
          <TableHeader>
            <TableColumn>ID Produk</TableColumn>
            <TableColumn>Kuantitas</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Aksi</TableColumn>
          </TableHeader>
          <TableBody emptyContent="Tidak ada pembelian tersedia.">
            {purchases.map((purchase) => (
              <TableRow key={purchase.id}>
                <TableCell>{purchase.produk_id}</TableCell>
                <TableCell>{purchase.kuantitas}</TableCell>
                <TableCell>{purchase.status}</TableCell>
                <TableCell className="flex gap-2">
                  <Button size="sm" color="warning" onClick={() => handleEdit(purchase)}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    color="danger"
                    onPress={() => {
                      setSelectedPurchase(purchase);
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
                <ModalHeader>Tambah Pembelian</ModalHeader>
                <ModalBody className="gap-3">
                  <Select
                    label="Pilih Produk"
                    value={newPurchase.produk_id}
                    onChange={(e) => setNewPurchase({ ...newPurchase, produk_id: e.target.value })}
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
                    value={newPurchase.kuantitas}
                    onChange={(e) => setNewPurchase({ ...newPurchase, kuantitas: e.target.value })}
                  />
                  <Select
                    label="Pilih Status"
                    value={newPurchase.status}
                    onChange={(e) => setNewPurchase({ ...newPurchase, status: e.target.value })}
                  >
                    {[
                      { key: 'pending', label: 'Pending' },
                      { key: 'completed', label: 'Completed' },
                      { key: 'cancelled', label: 'Cancelled' },
                    ].map((status) => (
                      <SelectItem key={status.key}>{status.label}</SelectItem>
                    ))}
                  </Select>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={handleCreate}>
                    Simpan
                  </Button>
                </ModalFooter>
              </>
            )}

            {modalAction === 'edit' && selectedPurchase && (
              <>
                <ModalHeader>Edit Pembelian</ModalHeader>
                <ModalBody className="gap-3">
                  <Input
                    label="ID Produk"
                    value={selectedPurchase.produk_id}
                    disabled
                    onChange={(e) => setSelectedPurchase({ ...selectedPurchase, produk_id: e.target.value })}
                  />
                  <Input
                    label="Kuantitas"
                    type="number"
                    value={selectedPurchase.kuantitas}
                    onChange={(e) => setSelectedPurchase({ ...selectedPurchase, kuantitas: e.target.value })}
                  />
                  <Select
                    label="Pilih Status"
                    value={selectedPurchase.status}
                    onChange={(e) => setSelectedPurchase({ ...selectedPurchase, status: e.target.value })}
                  >
                    {[
                      { key: 'pending', label: 'Pending' },
                      { key: 'completed', label: 'Completed' },
                      { key: 'cancelled', label: 'Cancelled' },
                    ].map((status) => (
                      <SelectItem key={status.key}>{status.label}</SelectItem>
                    ))}
                  </Select>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={handleUpdate}>
                    Update
                  </Button>
                </ModalFooter>
              </>
            )}

            {modalAction === 'delete' && selectedPurchase && (
              <>
                <ModalHeader className="text-red-600">Hapus Pembelian</ModalHeader>
                <ModalBody>Yakin ingin menghapus pembelian produk ID {selectedPurchase.produk_id}?</ModalBody>
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
