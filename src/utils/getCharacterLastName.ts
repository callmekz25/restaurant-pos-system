const getCharacterLastName = (fullName: string): string => {
  if (!fullName) return "";

  const parts = fullName.trim().split(" ");
  const lastName = parts[parts.length - 1];

  return lastName.charAt(0).toUpperCase();
};
export default getCharacterLastName;
