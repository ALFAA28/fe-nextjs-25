// app/product_category/page.tsx
'use client'; // Baris ini HARUS ada karena komponen ini menggunakan state dan event (interactivity)

import { useState, useCallback } from 'react';

// Next.js akan menggunakan globals.css, jadi tidak perlu import di sini jika menggunakan App Router

export default function ProductCategoryPage() {
    // --- State untuk Fitur 1: Dynamic List ---
    const [items, setItems] = useState<string[]>([]); // State array untuk menyimpan daftar item
    const [newItemText, setNewItemText] = useState<string>(''); // State untuk input teks

    // --- State untuk Fitur 3: Counter ---
    const [counter, setCounter] = useState<number>(0); // State untuk nilai counter

    // --- State untuk Fitur 4: Toggle Show/Hide ---
    const [isVisible, setIsVisible] = useState<boolean>(true); // State untuk status tampil/sembunyi

    // --------------------------------------------------
    // 1. Dynamic List Handlers (document.createElement, appendChild, remove)
    // --------------------------------------------------
    const handleAddItem = useCallback(() => {
        // Logika DOM Manipulation diganti dengan manipulasi State React
        if (newItemText.trim() !== '') {
            setItems((prevItems) => [...prevItems, newItemText.trim()]);
            setNewItemText('');
        }
    }, [newItemText]);

    const handleRemoveItem = useCallback((indexToRemove: number) => {
        // Logika penghapusan item (mengganti remove())
        setItems((prevItems) => prevItems.filter((_, index) => index !== indexToRemove));
    }, []);

    // --------------------------------------------------
    // 2. Ubah Warna Background Handler (style.backgroundColor, Event onclick)
    // --------------------------------------------------
    const changeBackgroundColor = useCallback((color: string) => {
        // Ini adalah satu-satunya tempat di mana kita perlu memanipulasi DOM secara langsung
        // (Mengganti document.body.style.backgroundColor)
        if (typeof window !== 'undefined') {
            document.body.style.backgroundColor = color;
        }
    }, []);

    // --------------------------------------------------
    // 4. Toggle Show/Hide Handler (classList.toggle, style.display)
    // --------------------------------------------------
    const handleToggle = useCallback(() => {
        // Toggle state untuk conditional rendering atau classList.toggle
        setIsVisible((prevVisible) => !prevVisible);
    }, []);

    return (
        <div>
            <h1>Demonstrasi Manipulasi DOM di Next.js (TypeScript)</h1>

            {/* 1. Dynamic List */}
            <section id="dynamic-list">
                <h2>1. Daftar Dinamis 📝</h2>
                <input
                    type="text"
                    value={newItemText}
                    onChange={(e) => setNewItemText(e.target.value)}
                    placeholder="Masukkan item baru"
                    id="itemInput"
                />
                <button id="addItemBtn" onClick={handleAddItem}>Tambah Item</button>
                <ul id="itemList">
                    {/* Iterasi array state untuk me-render list item */}
                    {items.map((item, index) => (
                        <li key={index}> 
                            {item}
                            <button onClick={() => handleRemoveItem(index)}>Hapus</button>
                        </li>
                    ))}
                </ul>
            </section>

            <hr />

            {/* 2. Ubah Warna Background Secara Dinamis */}
            <section id="background-color-changer">
                <h2>2. Ubah Warna Background 🎨</h2>
                <p>Klik tombol di bawah untuk mengubah warna background halaman.</p>
                <button onClick={() => changeBackgroundColor('#f8d7da')}>Merah</button>
                <button onClick={() => changeBackgroundColor('#d4edda')}>Hijau</button>
                <button onClick={() => changeBackgroundColor('#cce5ff')}>Biru</button>
            </section>

            <hr />

            {/* 3. Counter dengan DOM Manipulation */}
            <section id="dom-counter">
                <h2>3. Counter Sederhana 🔢</h2>
                <div className="counter-display">
                    Nilai saat ini: <span id="counterValue">{counter}</span>
                    {/* Mengganti innerText/textContent dengan menampilkan state */}
                </div>
                <button onClick={() => setCounter(counter - 1)}>-</button>
                <button onClick={() => setCounter(counter + 1)}>+</button>
                <button onClick={() => setCounter(0)}>Reset</button>
            </section>

            <hr />

            {/* 4. Toggle Show/Hide Element */}
            <section id="toggle-element">
                <h2>4. Toggle Tampilkan/Sembunyikan 👀</h2>
                <button id="toggleBtn" onClick={handleToggle}>
                    {/* Teks tombol tergantung pada state isVisible */}
                    {isVisible ? 'Sembunyikan' : 'Tampilkan'}
                </button>
                
                {/* Menggunakan Class List Toggle (Deklaratif dengan ClassName) */}
                <p 
                    id="toggleParagraph" 
                    className={isVisible ? 'visible' : 'visible hidden'} 
                >
                    Paragraf ini ditampilkan atau disembunyikan menggunakan state React.
                </p>
                
                {/* ATAU menggunakan Conditional Rendering (Mengganti style.display) 
                {isVisible && (
                    <p id="toggleParagraph" className="visible">
                        Paragraf ini ditampilkan atau disembunyikan menggunakan state React.
                    </p>
                )}
                */}

            </section>
        </div>
    );
}