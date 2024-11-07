import Chatbot from "@/Features/Chat/ChatBot";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function PageChat() {
  return (
    <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Chat</h2>}>
      <Head title="Chat" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <Chatbot></Chatbot>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
