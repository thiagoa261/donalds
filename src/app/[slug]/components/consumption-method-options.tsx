import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { eConsumptionMethod } from "@prisma/client";

interface ConsumptionMethodOptionProps {
  slug: string;
  imageUrl: string;
  alt: string;
  buttonText: string;
  option: eConsumptionMethod;
}

const ConsumptionMethodOption = ({
  slug,
  imageUrl,
  alt,
  buttonText,
  option,
}: ConsumptionMethodOptionProps) => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-8 py-8">
        <div className="relative h-[80px] w-[80px]">
          <Image src={imageUrl} alt={alt} fill className="object-contain" />
        </div>

        <Button variant="secondary" className="rounded-full" asChild>
          <Link href={`/${slug}/menu?consumptionMethod=${option}`}>{buttonText}</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConsumptionMethodOption;
