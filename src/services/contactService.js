export const contactService = {
  async submitInquiry(payload) {

    const response = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to submit inquiry");
    }

    return await response.json();
  },
};

export default contactService;