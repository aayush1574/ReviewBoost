// Replace with your actual Firebase Cloud Function URL
// It should look something like: "https://us-central1-aireview-7d2e2.cloudfunctions.net/api/api/review"
const backendUrl = "https://us-central1-aireview-7d2e2.cloudfunctions.net/api/api/review";

async function testMyBackend() {
  console.log("Sending code to Firebase backend for review...\n");

  const sampleCode = `
function calculateTotal(items) {
  let total = 0;
  for(let i=0; i <= items.length; i++) {
    total += items[i].price;
  }
  return total;
}
`;

  try {
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ code: sampleCode })
    });

    const text = await response.text();
    
    if (response.ok) {
      console.log("✅ Review received successfully!\n");
      console.log(JSON.parse(text).review);
    } else {
      console.error(`❌ Error from backend (Status: ${response.status}):\n${text}`);
    }
  } catch (error) {
    console.error("❌ Failed to connect to the backend:", error.message);
  }
}

testMyBackend();
