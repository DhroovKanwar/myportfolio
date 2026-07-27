import useLenis from "@/hooks/useLenis";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export default function MainLayout({ children }) {
  useLenis();

  return (
    <div className="App grain relative min-h-screen bg-background">
      <CustomCursor />
      <Navbar />
      {children}
      <Footer />
      <BackToTop />
    </div>
  );
}
