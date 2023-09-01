"use client";

import { FC } from "react";
import { toast } from "@/hooks/use-toast";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useLinks } from "@/hooks/useLinks";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import Links from "@/components/Links";

import { LinkRequest, LinkValidator } from "@/libs/validators/links";
import { Link } from "@prisma/client";

const HomePage: FC = () => {
  const links = useLinks();
  const form = useForm<LinkRequest>({
    resolver: zodResolver(LinkValidator),

    defaultValues: {
      url: "",
    },
  });

  const { mutate: shortUrl } = useMutation({
    mutationFn: async (values: LinkRequest) => {
      const payload: LinkRequest = {
        ...values,
      };

      const { data } = await axios.post("/api/links", payload);

      return data;
    },

    onSuccess: (data: Link) => {
      links.addLink(data);

      form.reset();
    },

    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "Something went wrong",
            description: err.message,
          });
        }
      }

      toast({
        title: "Something went wrong",
        description: "Coudn't shorten the link,please try again later",
      });
    },
  });

  return (
    <div className="flex w-full flex-col items-center gap-7">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((e) => shortUrl(e))}
          className="w-full space-y-5 px-8 sm:w-auto sm:px-0"
        >
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Url</FormLabel>
                <FormControl>
                  <Input
                    className="w-full sm:w-[410px] md:w-[480px] lg:w-[550px] xl:w-[650px]"
                    placeholder="write your url to short"
                    {...field}
                  />
                </FormControl>
                <FormDescription>This url is your long url</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Short</Button>
        </form>
      </Form>

      <Links />

      <div className="custom-width flex justify-end">
        <Button onClick={() => links.clear()}>CLear all Short Links</Button>
      </div>
    </div>
  );
};

export default HomePage;
