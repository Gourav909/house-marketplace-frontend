export const getHeaders = (isFormData = false) => {
  const currentUser = localStorage.getItem("currentUser");
  const contentType = isFormData
    ? { "Content-Type": "multipart/form-data" }
    : { "Content-Type": "application/json" };

  if (currentUser) {
    const decodedString = JSON.parse(atob(currentUser));

    return {
      headers: {
        ...contentType,
        "access-token": decodedString["access-token"],
        client: decodedString.client,
        uid: decodedString.uid,
      },
    };
  } else {
    return {
      headers: { ...contentType },
    };
  }
};
