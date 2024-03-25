import { useEffect, useState } from "react";
import { Instance } from "../config/Instance";
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import AddRelationship from "../components/AddRelationship";

export type TRelationData = {
  id: number;
  Relation_CD: string;
  Relation_Eng: string;
  Relation_Nepali: string;
};

export default function Relationship() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [relationData, setRelationData] = useState<TRelationData[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editRelationData, setEditRelationData] =
    useState<TRelationData | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchRelationships = async () => {
      setLoading(true);
      try {
        const res = await Instance.get("/v1/users");
        setRelationData(res.data.users);
      } catch (error: any) {
        setError(error.response.data);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRelationships();
  }, []);

  const handleAddRelationModal = () => {
    setIsModalOpen(true);
  };

  const handleRelationDelete = async (id: number) => {
    try {
      const res = await Instance.delete(`/v1/user/${id}`);
      if (res.status === 200) {
        setRelationData((prev) => {
          if (prev) {
            return prev.filter((item) => item.id !== id);
          } else {
            return [];
          }
        });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleEdit = async (id: number) => {
    const updateRelationship = await relationData?.find(
      (item) => item.id === id
    );
    setEditId(id);
    setIsEdit(true);
    setIsModalOpen(true);
    if (updateRelationship) {
      setEditRelationData(updateRelationship);
    }
  };

  return (
    <>
      {isModalOpen && (
        <AddRelationship
          editId={editId}
          setEditId={setEditId}
          editRelationData={editRelationData}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setRelationData={setRelationData}
          setEditRelationData={setEditRelationData}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <div className="w-1/2 mx-auto flex justify-between mt-5">
        <h1 className="text-3xl font-semibold">Relationship Table</h1>
        <button
          className="bg-green-500 w-28 text-white font-semibold uppercase py-2 rounded-lg"
          onClick={handleAddRelationModal}
        >
          add
        </button>
      </div>
      <table className="w-1/2 mx-auto mt-14 border-2 border-[#D4DCF7] bg-[#F5F7FD]">
        {loading ? (
          <div>Loading</div>
        ) : (
          <>
            <thead className="border">
              <th className="px-4 py-2 border-2 border-[#D4DCF7] text-left">
                Id
              </th>
              <th className="px-4 py-2 border-2 border-[#D4DCF7] text-left">
                Relation_CD
              </th>
              <th className="px-4 py-2 border-2 border-[#D4DCF7] text-left">
                Relation_Eng
              </th>
              <th className="px-4 py-2 border-2 border-[#D4DCF7] text-left">
                Relation_Nepali
              </th>
              <th className="px-4 py-2 border-2 border-[#D4DCF7] text-left">
                Action
              </th>
            </thead>
            <tbody>
              {relationData &&
                relationData.length > 0 &&
                relationData.map((item, index) => (
                  <tr>
                    <td className="px-4 text-lg py-2 border-2 border-[#D4DCF7] text-left ">
                      {index + 1}
                    </td>
                    <td className="px-4 text-lg  border-2 border-[#D4DCF7] text-left">
                      {item.Relation_CD}
                    </td>
                    <td className="px-4 text-lg  border-2 border-[#D4DCF7] text-left">
                      {item.Relation_Eng}
                    </td>
                    <td className="px-4 text-lg  border-2 border-[#D4DCF7] text-left">
                      {item.Relation_Nepali}
                    </td>
                    <td className="px-4 text-lg  border-2 border-[#D4DCF7] text-left">
                      <div className="flex items-center justify-around">
                        <div
                          onClick={() => handleRelationDelete(item.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all ease-in-out duration-300 cursor-pointer"
                        >
                          <FaTrashAlt />
                        </div>
                        <MdEdit
                          onClick={() => handleEdit(item.id)}
                          className="text-green-600 cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </>
        )}
      </table>
    </>
  );
}
