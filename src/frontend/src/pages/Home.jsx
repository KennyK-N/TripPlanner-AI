import { useEffect, useState } from "react";
import useInfiniteScrolling from "@hooks/useInfiniteScroll";
import fetchDataMain from "@/services/fetchDataMain";

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alertValue, setAlertValue] = useState({
    type: "None",
    value: "",
  });
  const [isStopFetch, setIsStopFetch] = useState(false);
  function fetchDataOuter(page) {
    fetchDataMain(page, setItems, setLoading, setAlertValue, setIsStopFetch);
  }

  const { observerTarget, page } = useInfiniteScrolling(
    fetchDataOuter,
    loading,
  );
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
        {Items}
      </div>
      {!isStopFetch && (
        <div
          ref={observerTarget}
          className="observerTarget h-20 w-full col-span-full"
        ></div>
      )}
      {loading && <h1>test</h1>}
    </>
  );
}
