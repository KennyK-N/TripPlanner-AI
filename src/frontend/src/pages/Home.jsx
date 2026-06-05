import { useState } from "react";
import useInfiniteScrolling from "@hooks/useInfiniteScroll";
import fetchDataMain from "@/services/fetchDataMain";

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alertValue, setAlertValue] = useState({
    type: "None",
    value: "",
  });

  function fetchDataOuter(page) {
    fetchDataMain(page, setItems, setLoading, setAlertValue);
  }
  // use usecallback for effiency but then we will need to move observerTarget outside useInfiniteScrolling scope
  const { observerTarget } = useInfiniteScrolling(fetchDataOuter);

  const Items = items.map((item, index) => {
    return (
      <div
        key={index}
        className="bg-white rounded-xl shadow p-6 h-fit min-h-50"
      >
        <h1 className="text-2xl font-bold leading-relaxed break-words">
          Dashboard
        </h1>
        <p className="text-sm leading-relaxed break-words">
          Your content goes here
        </p>
      </div>
    );
  });

  return (
    <>
      <div className="grid md:grid-cols-[repeat(auto-fit,minmax(600px,1fr))] grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
        {/*children */}
        {Items}
      </div>
      <div ref={observerTarget} className="observerTarget"></div>
      {loading && <h1>test</h1>}
    </>
  );
}
