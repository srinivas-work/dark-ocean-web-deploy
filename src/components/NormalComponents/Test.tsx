import { useEffect } from "react";

const Test = () => {
  useEffect(() => {
    const loginUser = async () => {
      const res = await fetch(
        "https://dark-ocean-server-f3a2a8gtfchxajd2.canadacentral-01.azurewebsites.net/api/auth/local",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            identifier: "srinivas.n@crayonandquill.com", // Your email
            password: "DarkoceanStrapi@1919", // Your password
          }),
        }
      );

      const data = await res.json();

      localStorage.setItem("jwtStrapi", data.jwt);
    };

    loginUser();

    const fetchData = async () => {
      const token = localStorage.getItem("jwtStrapi");

      const res = await fetch(
        "https://dark-ocean-server-f3a2a8gtfchxajd2.canadacentral-01.azurewebsites.net/api/about-us-cards?populate[AboutCardImage][fields][0]=url",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach JWT
          },
        }
      );

      const data = await res.json();
      console.log(data); // Handle the fetched data
    };

    fetchData();
  }, []);
  return null;
};

export default Test;
