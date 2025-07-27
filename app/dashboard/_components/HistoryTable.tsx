import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ClipboardCopy } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Define the type for history data
type HistoryData = {
  id: number;
  FormData: string;
  aiResponse: string | null;
  templateSlug: string;
  createdBy: string;
  createdAt: string;
};

interface HistoryTableProps {
  data: HistoryData;
}

const HistoryTable: React.FC<HistoryTableProps> = ({ data }) => {
  const [open, setOpen] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  // Limit AI Response to 100 characters (or adjust as needed)
  const shortResponse = data.aiResponse && data.aiResponse.length > 100 
    ? data.aiResponse.substring(0, 100) + "..." 
    : data.aiResponse || "No response";

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 w-full max-w-6xl mx-auto">
      <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
        <span className="mr-2">📜</span> History Entry
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Template Information */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-blue-800 mb-2">Template Information</h4>
          <div className="text-gray-700">
            <p><strong>Template:</strong> {data.templateSlug}</p>
            <p><strong>Created:</strong> {data.createdAt}</p>
            <p><strong>Created By:</strong> {data.createdBy}</p>
          </div>
        </div>

        {/* Form Data */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-green-800 mb-2">Form Data</h4>
          <div className="text-gray-700">
            <p className="break-words">{data.FormData}</p>
          </div>
        </div>
      </div>

      {/* AI Response Section */}
      <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
        <h4 className="text-lg font-semibold text-yellow-800 mb-2">AI Response</h4>
        <div className="text-gray-700 mb-4">
          <p className="break-words">{shortResponse}</p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600"
              >
                View Full Response
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
              <DialogHeader>
                <DialogTitle>Full AI Response</DialogTitle>
              </DialogHeader>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm text-gray-800">
                  {data.aiResponse || "No response available"}
                </pre>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button 
            onClick={() => handleCopy(data.aiResponse || "")}
            variant="outline"
            className="bg-green-600 hover:bg-green-700 text-white border-green-600 flex items-center gap-2"
          >
            <ClipboardCopy className="w-4 h-4" />
            Copy Response
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HistoryTable;