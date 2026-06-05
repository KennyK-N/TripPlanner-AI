import axios from "axios";
export default async function fetchDataMain(
  page,
  setItems,
  setLoading,
  setAlertValue,
) {
  let final;
  try {
    const limit = 5;

    const skip = (page - 1) * limit;
    //Todo: This will return an array, so the actual implementation will also need to return an array,
    // We can ignore limit and skip, because our endpoint will only accept page as a parameter
    const res = await axios.get(
      `https://dummyjson.com/users?limit=${limit}&skip=${skip}`,
    );
    const item = res?.data?.users;
    final = item ? item : [];
  } catch (error) {
    final = [];
  } finally {
    setItems((prev) => {
      const merged = [...prev, ...final];
      const unique = Array.from(
        new Map(merged.map((item) => [item.id, item])).values(),
      );

      return unique;
    });
    //Todo: handle setLoading, setAlertValue in here
  }
}
