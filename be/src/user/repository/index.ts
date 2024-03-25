import OracleDB from "oracledb";

const oracleConfig = {
  user: "system",
  password: "root",
  connectionString: "localhost:1521/XEPDB1",
};

interface ExecuteResult {
  outBinds?: {
    new_id: number[];
    new_cd: string[];
    new_eng: string[];
    new_nepali: string[];
    // Add any other outBinds properties here as needed
  };
}
export const postUser = async (
  user: any
): Promise<{ status: number; message: string; data?: any }> => {
  try {
    const connection = await OracleDB.getConnection(oracleConfig);

    const sql = `
    INSERT INTO RELATIONSHIP (RELATION_CD, RELATION_Eng, RELATION_Nepali)
    VALUES (:Relation_CD, :Relation_Eng, :Relation_Nepali)
    RETURNING ID, RELATION_CD, RELATION_Eng, RELATION_Nepali INTO :new_id, :new_cd, :new_eng, :new_nepali
  `;

    // Pass bind variables with necessary attributes
    const result: ExecuteResult = await connection.execute(sql, {
      Relation_CD: user.Relation_CD,
      Relation_Eng: user.Relation_Eng,
      Relation_Nepali: user.Relation_Nepali,
      new_id: { dir: OracleDB.BIND_OUT, type: OracleDB.NUMBER },
      new_cd: { dir: OracleDB.BIND_OUT, type: OracleDB.STRING },
      new_eng: { dir: OracleDB.BIND_OUT, type: OracleDB.STRING },
      new_nepali: { dir: OracleDB.BIND_OUT, type: OracleDB.STRING },
    });

    await connection.commit();
    await connection.close();

    const insertedData = {
      id: (result.outBinds?.new_id && result.outBinds.new_id[0]) || -1,
      Relation_CD: (result.outBinds?.new_cd && result.outBinds.new_cd[0]) || "",
      Relation_Eng:
        (result.outBinds?.new_eng && result.outBinds.new_eng[0]) || "",
      Relation_Nepali:
        (result.outBinds?.new_nepali && result.outBinds.new_nepali[0]) || "",
    };
    return {
      status: 201,
      message: "User created successfully",
      data: insertedData,
    };
  } catch (error: any) {
    return { status: 500, message: error.message };
  }
};

export const getAllUsers = async (): Promise<{
  status: number;
  message: string;
  users?: any;
}> => {
  try {
    const connection = await OracleDB.getConnection(oracleConfig);
    const sql = `SELECT * FROM RELATIONSHIP`;
    const result = await connection.execute(sql);

    await connection.close();

    // Check if result.rows is defined before attempting to access it
    if (result.rows) {
      // Assert the type of result.rows to be any[]
      const rows: any[] = result.rows;

      // Transform the result rows into an array of objects
      const users = rows.map((row: any[]) => {
        return {
          id: row[0],
          Relation_CD: row[1],
          Relation_Eng: row[2],
          Relation_Nepali: row[3],
        };
      });

      return { status: 200, message: "Users fetched successfully", users };
    } else {
      // Handle the case where result.rows is undefined
      return { status: 404, message: "No users found" };
    }
  } catch (error: any) {
    return { status: 500, message: error.message };
  }
};

export const updateUser = async (
  user: any,
  id: string
): Promise<{
  status: number;
  message: string;
}> => {
  const userId = Number(id);
  try {
    const connection = await OracleDB.getConnection(oracleConfig);
    const sql = `UPDATE RELATIONSHIP SET Relation_CD = :Relation_CD, Relation_Eng = :Relation_Eng, Relation_Nepali = :Relation_Nepali WHERE id = :id`;
    const result = await connection.execute(sql, {
      Relation_CD: user.Relation_CD,
      Relation_Eng: user.Relation_Eng,
      Relation_Nepali: user.Relation_Nepali,
      id: userId,
    });

    await connection.commit();
    await connection.close();

    return { status: 200, message: "User updated successfully" };
  } catch (error: any) {
    return { status: 500, message: error.message };
  }
};
export const deleteUser = async (
  id: string
): Promise<{
  status: number;
  message: string;
}> => {
  try {
    const connection = await OracleDB.getConnection(oracleConfig);
    const sql = `DELETE FROM RELATIONSHIP WHERE id = :id`;
    const result = await connection.execute(sql, {
      id: id,
    });

    await connection.commit();
    await connection.close();

    return { status: 200, message: "User deleted successfully" };
  } catch (error: any) {
    return { status: 500, message: error.message };
  }
};
