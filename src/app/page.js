import Image from "next/image";
import MainSection from "./component/MainSection";
import Allproducts from "./component/Allproducts";

export default function Home() {
  return (
    <div>
      <MainSection></MainSection>
      <Allproducts></Allproducts>
    </div>
  );
}
