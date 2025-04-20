import { MomentForm } from "@/components/moment-form"

export default function FormPage() {
  return (
    <div className="container max-w-2xl mx-auto pt-20">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Ghi lại khoảnh khắc</h1>
        <p className="text-muted-foreground">
          Chia sẻ những khoảnh khắc học hỏi, áp dụng, suy ngẫm hoặc kết nối của bạn
        </p>
        <MomentForm />
      </div>
    </div>
  )
} 