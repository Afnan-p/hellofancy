async function test() {
  try {
    const res = await fetch('http://localhost:5000/api/settings');
    const text = await res.text();
    console.log('Status:', res.status);
    console.log('Body:', text);
  } catch (e) {
    console.error('Fetch error:', e);
  }
}
test();
