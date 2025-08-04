
const API_URL = "http://127.0.0.1:4000/contacts";

export const fetchContacts = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("خطا در دریافت مخاطبین");
  return res.json();
};

export const addContact = async (newContact) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newContact),
  });
  if (!res.ok) throw new Error("خطا در افزودن مخاطب");
  return res.json();
};

export const deleteContact = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("خطا در حذف مخاطب");
  return true;
};

export const editContact = async (id, updatedContact) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedContact),
  });
  if (!res.ok) throw new Error("خطا در ویرایش مخاطب");
  return res.json();
};

export const deleteMultipleContacts = async (ids) => {
  await Promise.all(
    ids.map(async (id) => {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`خطا در حذف مخاطب ${id}`);
    })
  );
  return true;
};
