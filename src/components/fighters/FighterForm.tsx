import React, { useState, useContext, type ChangeEvent } from "react";
import { FighterContext } from "../../contexts/FighterContext";
import type IFighterContext from "../../interfaces/IFighterContext";
import type { IFighter } from "../../interfaces/IFighter";

const FighterForm: React.FC = () => {
  const { saveFighter } = useContext(FighterContext) as IFighterContext;

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState(0);
  const [purchaseStatus, setPurchaseStatus] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setImageFile(e.target.files[0]);
  };

  const handleSave = async () => {
    if (!name || !gender || !price || !imageFile) {
      setStatus("Vennligst fyll ut alle felt og velg et bilde.");
      return;
    }

    const fighterData: Omit<IFighter, "id" | "image"> = {
      name,
      gender,
      price,
      purchaseStatus,
    };

    const savedFighter = await saveFighter(fighterData, imageFile);

    if (savedFighter) {
      setStatus(`Fighter "${savedFighter.name}" lagret!`);
      setName("");
      setGender("");
      setPrice(0);
      setPurchaseStatus(false);
      setImageFile(null);
    } else {
      setStatus("Noe gikk galt ved lagring av fighter.");
    }
  };


  return (
    <section className="flex flex-col gap-3 max-w-sm">
      <h3 className="text-lg font-semibold">Legg til ny fighter</h3>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="border p-2 rounded"
      />

      <input
        type="text"
        placeholder="Gender"
        value={gender}
        onChange={e => setGender(e.target.value)}
        className="border p-2 rounded"
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={e => setPrice(Number(e.target.value))}
        className="border p-2 rounded"
      />

      <label className="border p-2 rounded cursor-pointer">
        Velg bilde
        <input type="file" onChange={handleFileChange} className="hidden" />
      </label>

      <button
        onClick={handleSave}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
      >
        Lagre fighter
      </button>

      {status && <p className="mt-2 text-red-500">{status}</p>}
    </section>
  );
};

export default FighterForm;
