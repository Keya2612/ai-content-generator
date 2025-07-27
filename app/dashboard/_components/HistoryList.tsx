"use client"
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import { useAuth } from '@/lib/auth-context'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import HistoryTable from "@/app/dashboard/_components/HistoryTable";

// Define the type for history items
type HistoryItem = {
  id: number;
  FormData: string;
  aiResponse: string | null;
  templateSlug: string;
  createdBy: string;
  createdAt: string;
};

function HistoryList  ()  {

    const {user} = useAuth();
    const [history, setHistory] = useState<HistoryItem[]>([]);

    useEffect(() => {
       user&& GetHistory();
    },[user])

    const GetHistory=async()=>{
        const result = await db.select().from(AIOutput).where(eq(AIOutput.createdBy,user?.email || '')).orderBy(desc(AIOutput.id));
        console.log(result);
        setHistory(result);
    }
    return (
      <div>
        <h2 className="text-lg font-medium my-2 py-2 flex"></h2>
        <div>
          {history && history.map((item) => (
            <HistoryTable key={item.id} data={item} />
          ))}
        </div>
      </div>
    );
  }
  
  
  export default HistoryList;
  


