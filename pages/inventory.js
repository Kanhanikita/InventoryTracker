import dynamic from "next/dynamic";

const Inventory = dynamic(() => import("../components/Inventory"), { ssr: false });

export default function InventoryPage() {
  return <Inventory />;
}
