"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const querySchema = z.object({
  searchQuery: z.string().min(1, { message: "Search query cannot be empty." }),
});

type QueryFormData = z.infer<typeof querySchema>;

function SearchBar() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<QueryFormData>({
    resolver: zodResolver(querySchema),
  });

  const onSubmit = (data: QueryFormData) => {
    router.push(`/search/${data.searchQuery}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center w-2/3 justify-center"
    >
      <input
        type="text"
        placeholder="Search Movies..."
        {...register("searchQuery")}
        className={`p-2 rounded-l-md w-3/5 text-black dark:bg-gray-700 dark:text-white focus:outline-none ${
          errors.searchQuery ? "border border-red-500" : "border-transparent"
        }`}
        onBlur={() => clearErrors("searchQuery")}
      />
      <button
        type="submit"
        className="bg-yellow-500 dark:bg-yellow-400 text-black py-2 px-4 rounded-r-md hover:bg-yellow-600 dark:hover:bg-yellow-500 transition"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
