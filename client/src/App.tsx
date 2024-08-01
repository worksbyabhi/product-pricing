import React, { useEffect } from "react";

import { LoginComponent } from "./routes/Login";
import { LayoutComponent } from "./designSystem/layout";
import { useUserContext } from "./store/LoggedUserStore";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserDashboard } from "./routes/Dashboard";
import { getUrl } from "./utils/functions/getUrl";
import { AddPricing } from "./routes/AddPricing";

function App() {
  const { user, updateUser, clearUser } = useUserContext();

  useEffect(() => {
    fetch(getUrl("/session"), {
      credentials: "include",
    })
      .then((response) => {
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </LayoutComponent>
  );
}

export default App;
