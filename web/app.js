import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics, isSupported as analyticsIsSupported } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyARV_0xiNcbfrimUW94Bb6UYBCubzWURcI",
  authDomain: "ambition-paper-e-shop.firebaseapp.com",
  projectId: "ambition-paper-e-shop",
  storageBucket: "ambition-paper-e-shop.firebasestorage.app",
  messagingSenderId: "32390353807",
  appId: "1:32390353807:web:5450d62757276e086831fa",
  measurementId: "G-NNTZYQ171Y"
};

const app = initializeApp(firebaseConfig);
try {
  if (await analyticsIsSupported()) getAnalytics(app);
} catch (_) {}
const db = getFirestore(app);

const form = document.getElementById("product-form");
const nameEl = document.getElementById("name");
const priceEl = document.getElementById("price");
const statusEl = document.getElementById("status");
const listEl = document.getElementById("product-list");

function setStatus(msg, cls = "") {
  statusEl.className = `status ${cls}`.trim();
  statusEl.textContent = msg || "";
}

async function loadProducts() {
  listEl.innerHTML = "";
  const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  snap.forEach((doc) => {
    const data = doc.data();
    const li = document.createElement("li");
    li.className = "item";
    const title = document.createElement("div");
    title.textContent = `${data.name} — ₹${Number(data.price).toFixed(2)}`;
    const meta = document.createElement("div");
    meta.className = "meta";
    const when = data.createdAt?.toDate ? data.createdAt.toDate() : null;
    meta.textContent = when ? when.toLocaleString() : "";
    li.append(title, meta);
    listEl.appendChild(li);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  setStatus("");
  const name = nameEl.value.trim();
  const price = Number(priceEl.value);
  if (!name || !Number.isFinite(price)) {
    setStatus("Enter a valid name and price", "err");
    return;
  }
  try {
    await addDoc(collection(db, "products"), {
      name,
      price,
      createdAt: serverTimestamp(),
    });
    setStatus("Saved ✔", "ok");
    form.reset();
    await loadProducts();
  } catch (err) {
    console.error(err);
    setStatus("Failed to save", "err");
  }
});

loadProducts();
