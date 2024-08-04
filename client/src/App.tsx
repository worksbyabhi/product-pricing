import React, { useEffect } from "react";

import { LoginComponent } from "./routes/Login";
import { LayoutComponent } from "./designSystem/layout";
import { useUserContext } from "./store/LoggedUserStore";
import { Route, Routes, useNavigate } from "react-router-dom";
import { UserDashboard } from "./routes/Dashboard";
import { AddPricing } from "./routes/AddPricing";

function App() {
  const { user, updateUser, clearUser } = useUserContext();
  const navigateTo = useNavigate();

  useEffect(() => {
    fetch("/session", {
      credentials: "include",
    })
      .then((response) => {
        // console.log(response.headers.get("content-type"));
        if (!response.ok) {
          throw new Error("Invalid session");
        }
        return response.json();
      })
      .then((data) => {
        if (data.username && data.role) {
          updateUser(data);
        }
      })
      .catch(() => {
        clearUser();
        navigateTo("/");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LayoutComponent>
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<UserDashboard />} />
            <Route path="/add-pricing" element={<AddPricing />} />
          </>
        ) : (
          <Route path="/" element={<LoginComponent />} />
        )}
      </Routes>
    </LayoutComponent>
  );
}

export default App;
