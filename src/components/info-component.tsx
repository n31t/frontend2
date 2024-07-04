
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { JSX, SVGProps } from "react"

export function InfoComponent() {
  return (
    <Card className="max-w-3xl mx-auto p-6 sm:p-8 md:p-10">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Find Your Dream Apartment</CardTitle>
        <CardDescription>Follow these steps to connect with apartment sellers.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-8">
          <div>
            <h2 className="text-2xl font-bold">1. Search for Apartments</h2>
            <div className="flex gap-2 mt-4">
              <Input type="text" placeholder="Enter location, price range, or other criteria" className="flex-1" />
              <Button>Search</Button>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold">2. Contact Seller</h2>
            <div className="flex gap-2 mt-4">
              <Button>Auto-Contact</Button>
              <div className="flex items-center gap-2">
                <PhoneIcon className="w-5 h-5 text-muted-foreground" />
                <span className="text-muted-foreground">Call seller directly:</span>
                <Input type="tel" placeholder="(123) 456-7890" />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold">3. Wait for Response</h2>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <ClockIcon className="w-5 h-5 text-muted-foreground" />
                <span className="text-muted-foreground">Waiting for seller response...</span>
              </div>
              <Progress value={50} aria-label="Waiting for response" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ClockIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}


function PhoneIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}
