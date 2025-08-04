import ContactPage from "./Component/ContactPage";
import { Toaster } from 'react-hot-toast';


export default function App() {
  return (
    <>
      <Toaster position="top-right" />
      <ContactPage />
    </>
  );
}
