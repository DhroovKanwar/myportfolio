export const contactService = {
  async submitInquiry(payload) {

    const formData = new URLSearchParams();

    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, value ?? "");
    });

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbxajZDTX50gn09XOTNX4sSgnrYYfp_l5iTNZDH1B4NJfKTxElWqP3J0OqLy7n498PwxNQ/exec",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to submit inquiry");
    }

    return {
      success: true,
      data: {
        id: `INQ-${Date.now()}`,
      },
    };
  },
};

export default contactService;