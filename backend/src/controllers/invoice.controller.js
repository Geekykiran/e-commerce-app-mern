import PDFDocument from "pdfkit";


export const generateInvoice = async (req, res) => {
  try {
    const { id } = req.params; // orderId
    const order = await Order.findById(id)
      .populate("products.product")
      .populate("user");

    if (!order) return res.status(404).json({ message: "Order not found" });

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename=invoice-${order.invoiceId}.pdf`
    );

    doc.text(`Invoice ID: ${order.invoiceId}`);
    doc.text(`Customer: ${order.user.username} (${order.user.email})`);
    doc.text("Products:");

    order.products.forEach((p) => {
      doc.text(
        `- ${p.product.productName} (x${p.quantity}) = ₹${p.price * p.quantity}`
      );
    });

    doc.text(`Total: ₹${order.totalAmount}`);
    doc.end();
    doc.pipe(res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};