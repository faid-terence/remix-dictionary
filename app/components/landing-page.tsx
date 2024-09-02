import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import { Switch } from "~/components/ui/switch";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [definition, setDefinition] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${searchQuery}`
      );
      if (!response.ok) {
        throw new Error("Word not found");
      }
      const data = await response.json();
      setDefinition(data[0]);
      setError(null);
    } catch (err) {
      setError(err.message);
      setDefinition(null);
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-4 md:p-10">
      <header className="flex items-center w-full justify-between pb-4 border-b">
        <MenuIcon className="w-6 h-6" />
        <div className="flex items-center gap-4">
          <Select>
            <SelectTrigger className="text-muted-foreground">
              <SelectValue placeholder="Serif" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="serif">Serif</SelectItem>
              <SelectItem value="sans-serif">Sans Serif</SelectItem>
            </SelectContent>
          </Select>
          <Switch id="theme-toggle" />
        </div>
      </header>
      <main className="flex flex-col items-center w-full max-w-3xl mt-8 space-y-8">
        <form className="w-full" onSubmit={handleSearch}>
          <div className="relative">
            <Input
              type="search"
              placeholder="Search for a word"
              className="w-full pl-4 pr-10 py-2 rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchIcon className="absolute right-3 top-2.5 w-5 h-5 text-muted-foreground" />
          </div>
        </form>

        {error && <p className="text-red-500">{error}</p>}

        {definition && (
          <div className="w-full">
            <div className="flex items-center w-full justify-between">
              <div>
                <h1 className="text-5xl font-bold">{definition.word}</h1>
                <p className="text-xl text-purple-600">
                  {definition.phonetics[0]?.text}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-purple-100 text-purple-600"
                onClick={() => new Audio(definition.phonetics[0]?.audio).play()}
              >
                <PlayIcon className="w-8 h-8" />
              </Button>
            </div>
            <div className="space-y-4">
              {definition.meanings.map((meaning, index) => (
                <div key={index}>
                  <h2 className="text-xl font-semibold">
                    {meaning.partOfSpeech}
                  </h2>
                  <ul className="space-y-1">
                    {meaning.definitions.map((def, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-purple-600">•</span>
                        <p>{def.definition}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function MenuIcon(props) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function PlayIcon(props) {
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
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
