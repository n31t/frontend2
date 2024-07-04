export function ChainComponent() {
  return (
    <div className="w-full max-w-md mx-auto py-12">
      <div className="relative pl-6 after:absolute after:inset-y-0 after:w-px after:bg-muted-foreground/20 after:left-0">
        <div className="grid gap-8">
          <div className="grid gap-2 text-sm relative">
            <div className="aspect-square w-5 bg-[#FFFFFF] rounded-lg absolute left-0 translate-x-[-30px] z-10" />
            <div className="font-medium">Step 1</div>
            <div>Sign up for an account</div>
          </div>
          <div className="grid gap-2 text-sm relative">
          <div className="aspect-square w-5 bg-[#FFFFFF] rounded-lg absolute left-0 translate-x-[-30px] z-10" />
            <div className="font-medium">Step 2</div>
            <div>Connect your payment method</div>
          </div>
          <div className="grid gap-2 text-sm relative">
          <div className="aspect-square w-5 bg-[#FFFFFF] rounded-lg absolute left-0 translate-x-[-30px] z-10" />
            <div className="font-medium">Step 3</div>
            <div>Customize your profile</div>
          </div>
          <div className="grid gap-2 text-sm relative">
          <div className="aspect-square w-5 bg-[#FFFFFF] rounded-lg absolute left-0 translate-x-[-30px] z-10" />
            <div className="font-medium">Step 4</div>
            <div>Start using the platform</div>
          </div>
        </div>
      </div>
    </div>
  )
}
