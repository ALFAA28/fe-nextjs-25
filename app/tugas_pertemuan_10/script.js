// script.js

document.addEventListener('DOMContentLoaded', function() {

    // --------------------------------------------------
    // FITUR 1: Dynamic List (createElement, appendChild, remove)
    // --------------------------------------------------
    const itemInput = document.getElementById('itemInput');
    const addItemBtn = document.getElementById('addItemBtn');
    const itemList = document.getElementById('itemList');

    addItemBtn.addEventListener('click', function() {
        const itemText = itemInput.value.trim();

        if (itemText !== "") {
            // 1. document.createElement()
            const newItem = document.createElement('li');
            newItem.textContent = itemText;

            // Buat tombol Hapus
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Hapus';
            
            // Event Listener untuk tombol Hapus
            deleteBtn.addEventListener('click', function() {
                // remove() atau removeChild()
                itemList.removeChild(newItem); 
            });

            // Gabungkan tombol Hapus ke dalam item <li>
            newItem.appendChild(deleteBtn);

            // 2. appendChild()
            itemList.appendChild(newItem);

            // Bersihkan input
            itemInput.value = '';
        }
    });

    // --------------------------------------------------
    // FITUR 2: Ubah Warna Background (style.backgroundColor, Event onclick)
    // --------------------------------------------------
    const body = document.body;
    const redBtn = document.getElementById('redBtn');
    const greenBtn = document.getElementById('greenBtn');
    const blueBtn = document.getElementById('blueBtn');

    // Fungsi untuk mengubah warna background
    function changeBackgroundColor(color) {
        // Menggunakan style.backgroundColor
        body.style.backgroundColor = color;
    }

    // Menggunakan Event onclick
    redBtn.onclick = function() { changeBackgroundColor('#f8d7da'); }; 
    greenBtn.onclick = function() { changeBackgroundColor('#d4edda'); }; 
    blueBtn.onclick = function() { changeBackgroundColor('#cce5ff'); }; 


    // --------------------------------------------------
    // FITUR 3: Counter (innerText atau textContent)
    // --------------------------------------------------
    const counterValueSpan = document.getElementById('counterValue');
    const incrementBtn = document.getElementById('incrementBtn');
    const decrementBtn = document.getElementById('decrementBtn');
    const resetBtn = document.getElementById('resetBtn');

    let counter = 0;

    function updateCounterDisplay() {
        // Menggunakan textContent (atau innerText)
        counterValueSpan.textContent = counter; 
    }

    incrementBtn.addEventListener('click', function() {
        counter++;
        updateCounterDisplay();
    });

    decrementBtn.addEventListener('click', function() {
        counter--;
        updateCounterDisplay();
    });

    resetBtn.addEventListener('click', function() {
        counter = 0;
        updateCounterDisplay();
    });


    // --------------------------------------------------
    // FITUR 4: Toggle Show/Hide Element (classList.toggle)
    // --------------------------------------------------
    const toggleBtn = document.getElementById('toggleBtn');
    const toggleParagraph = document.getElementById('toggleParagraph');

    toggleBtn.addEventListener('click', function() {
        // Menggunakan classList.toggle()
        toggleParagraph.classList.toggle('hidden');

        // Mengubah teks tombol
        if (toggleParagraph.classList.contains('hidden')) {
            toggleBtn.textContent = 'Tampilkan';
        } else {
            toggleBtn.textContent = 'Sembunyikan';
        }
    });
});