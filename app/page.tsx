'use client'

import { useMemo, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  text: z.string().regex(/^[a-z]+$/, {
    message: "Please enter only lowercase letters from a to z.",
  }),
})

export default function Component() {
  const [result, setResult] = useState<{ breakdown: string; total: number; dividedBy9: number } | null>(null);

  const letterValues = useMemo(() => {
    const values: Record<string, number> = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5,
      f: 6,
      g: 7,
      h: 8,
      i: 9,
      j: 10,
      k: 11,
      l: 12,
      m: 13,
      n: 14,
      o: 15,
      p: 16,
      q: 17,
      r: 18,
      s: 19,
      t: 20,
      u: 21,
      v: 22,
      w: 23,
      x: 24,
      y: 25,
      z: 26
    };
    return values;
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { text } = values;

    const letterSum = text.split("").reduce((acc, char) => acc + letterValues[char], 0);
    const breakdown = text.split("").map((char) => `${char} (${letterValues[char]})`).join(" + ");

    const total = letterSum;

    const dividedBy9 = total / 9;

    setResult({
      breakdown: `${breakdown} = ${total}`,
      total,
      dividedBy9,
    });
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Letter Values</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {Object.entries(letterValues).map(([letter, value]) => (
              <div key={letter} className="text-center">
                {letter}: {value}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter text (lowercase letters only)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Calculate</Button>
        </form>
      </Form>

      {result && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Total:</strong> {result.total}</p>
            <p><strong>Total / 9:</strong> {result.dividedBy9}</p>
            <p className='flex md:flex-row flex-col md:gap-1.5'><strong>Breakdown:</strong> {result.breakdown}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}