import { useState } from "react";
import { Instance } from "../config/Instance";
import { TRelationData } from "../pages/Relationship";
import { RxCross2 } from "react-icons/rx";

type TProps = {
  setRelationData: React.Dispatch<React.SetStateAction<TRelationData[]>>;
  editId: number | null;
  isEdit: boolean;
  editRelationData: TRelationData | null;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setEditId: React.Dispatch<React.SetStateAction<number | null>>;
  setEditRelationData: React.Dispatch<
    React.SetStateAction<TRelationData | null>
  >;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function AddRelationship({
  setRelationData,
  editId,
  isEdit,
  editRelationData,
  setIsEdit,
  setEditId,
  setEditRelationData,
  setIsModalOpen,
}: TProps) {
  const [relationshipData, setRelationshipData] = useState({
    Relation_CD: "" || editRelationData?.Relation_CD,
    Relation_Eng: "" || editRelationData?.Relation_Eng,
    Relation_Nepali: "" || editRelationData?.Relation_Nepali,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await Instance.put(`/v1/user/${editId}`, relationshipData);
        setRelationData((prev) => {
          if (!prev) return [];
          return prev.map((item) => {
            if (item.id === editId) {
              return { ...item, ...relationshipData };
            }
            return item;
          }) as TRelationData[];
        });
      } else {
        const res = await Instance.post("/v1/user", relationshipData);
        setRelationData((prev) => {
          if (!prev) {
            return [relationshipData];
          } else {
            return [...prev, res.data.data];
          }
        });
      }
      setIsEdit(false);
      setEditId(null);
      setEditRelationData(null);
      setIsModalOpen(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRelationshipData({
      ...relationshipData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditRelationData(null);
    setIsEdit(false);
  };

  return (
    <>
      <div className="flex items-center justify-center fixed top-0 bottom-0 left-0 w-full bg-black/60">
        <div className="bg-white shadow-lg w-1/5 h-1/2 rounded-lg p-4">
          <div className="ml-4">
            <div
              onClick={handleCloseModal}
              className="flex justify-center items-center rounded-full hover:bg-orange-500 hover:text-white transition-hover ease-in-out duration-300 cursor-pointer text-lg w-6 h-6"
            >
              <RxCross2 />
            </div>
            <form className="mt-4" onSubmit={handleSubmit}>
              <div>
                <label className="font-semibold">Relation_CD</label>
                <br />
                <input
                  className="border border-black px-2 py-1 mt-2"
                  type="text"
                  autoComplete="off"
                  name="Relation_CD"
                  value={relationshipData.Relation_CD}
                  onChange={handleOnChange}
                />
              </div>
              <div className="my-6">
                <label className="font-semibold">Relation_Eng</label>
                <br />
                <input
                  className="border border-black px-2 py-1 mt-2"
                  type="text"
                  autoComplete="off"
                  name="Relation_Eng"
                  value={relationshipData.Relation_Eng}
                  onChange={handleOnChange}
                />
              </div>
              <div>
                <label className="font-semibold">Relation_Nepali</label>
                <br />
                <input
                  className="border border-black px-2 py-1 mt-2"
                  type="text"
                  autoComplete="off"
                  name="Relation_Nepali"
                  value={relationshipData.Relation_Nepali}
                  onChange={handleOnChange}
                />
              </div>
              <button className="mt-4 bg-green-500 text-white font-semibold uppercase py-1 rounded-lg w-24">
                {isEdit ? "Edit" : "add"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
