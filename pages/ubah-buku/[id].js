import React from "react";
import Layout from "@/widget/Layout";
import Judul from "@/components/Judul";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import {updateDoc} from "firebase/firestore";

const UbahBuku = () => {
  const [nama_buku, setNama_buku] = useState(""); 
  const [pengarang, setPengarang] = useState(""); 
  const [deskripsi_buku, setDeskripsi_buku] = useState(""); 
  const [tahun_terbit, setTahun_terbit] = useState(""); 
  
  const router = useRouter();

  useEffect(() => {
    const id  = router.query.id;
    if(id) {
      const getBukuListById = async () => {
        const bukuDocRef = doc(db, "buku", id);
        try {
          const docSnap = await getDoc(bukuDocRef);
          const dataBuku = docSnap.data();
          setNama_buku(dataBuku.nama_buku);
          setPengarang(dataBuku.pengarang);
          setDeskripsi_buku(dataBuku.deskripsi_buku);
          setTahun_terbit(dataBuku.tahun_terbit);
          console.log(dataBuku);
        } catch (err){
          console.error(err);
        }
      };
      getBukuListById();
    }
  }, [router]);

  const handleUpdate = async (e) => {
    const { id } = router.query;
    const bukuDocRef = doc(db, "buku", id);
    e.preventDefault();
    try {
      await updateDoc (bukuDocRef, {
        nama_buku: nama_buku,
        pengarang: pengarang,
        deskripsi_buku: deskripsi_buku,
        tahun_terbit: tahun_terbit,
      });
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center mx-2 mt-10">
        <div className="w-[550px] rounded-lg shadow-gray-200 shadow-lg p-10">
          {/* judul */}
          <Judul title="Form Ubah Buku" />
          {/* form tambah */}
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label className="text-md">Nama Buku</label>
              <input
                type="text"
                name="nama_buku"
                className="mt-2 block w-11/12 rounded-xl border px-3 py-2"
                onChange={(event) => {
                  setNama_buku(event.target.value);
                }}
                value={nama_buku}
                required
              />
            </div>
            <div className="mb-3">
              <label className="text-md">Pengarang</label>
              <input
                type="text"
                name="pengarang"
                className="mt-2 block w-11/12 rounded-xl border px-3 py-2"
                onChange={(event) => {
                  setPengarang(event.target.value);
                }}
                value={pengarang}
                required
              />
            </div>
            <div className="mb-3">
              <label className="text-md">Deskripsi Buku</label>
              <input
                type="text"
                name="deskripsi_buku"
                className="mt-2 block w-11/12 rounded-xl border px-3 py-2"
                onChange={(event) => {
                  setDeskripsi_buku(event.target.value);
                }}
                value={deskripsi_buku}
                required
              />
            </div>
            <div className="mb-3">
              <label className="text-md">Tahun Terbit</label>
              <input
               type="text"
               name="tahun_terbit"
               className="mt-2 block w-11/12 rounded-xl border px-3 py-2"
               onChange={(event) => {
                 setTahun_terbit(event.target.value);
               }}
               value={tahun_terbit}
               required
              />
            </div>
            <button className="bg-sky-500 hover:bg-sky-700 px-16 py-2 ml-20 text-white rounded-full mt-3">
              Simpan
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UbahBuku;
