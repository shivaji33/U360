export function convertToDDMMYYYY(date: string):string {
  const today = new Date(date);
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();

  return dd + "-" + mm + "-" + yyyy;
}
