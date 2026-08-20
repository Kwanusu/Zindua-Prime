import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(
            searchTerm
          )}&page=${page}`,
          {
            signal: controller.signal,
          }
        );

        setCharacters(response.data.results);
        setTotalPages(response.data.info.pages);
      } catch (err) {
        // Ignore requests that were cancelled
        if (axios.isCancel(err)) {
          return;
        }

        // Character not found
        if (err.response?.status === 404) {
          setCharacters([]);
          setTotalPages(1);
        } else {
          setError('Failed to fetch characters.');
        }
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchCharacters();
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [searchTerm, page]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search characters..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <p className="text-gray-500 text-lg animate-pulse">
            Loading characters...
          </p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div
          className="p-4 mb-6 text-red-700 bg-red-100 rounded-lg border border-red-200"
          role="alert"
        >
          {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && characters.length === 0 && (
        <p className="text-gray-500 py-6">No characters found.</p>
      )}

      {/* Character Cards Grid */}
      {!loading && !error && characters.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {characters.map((character) => (
              <div
                key={character.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                    {character.name}
                  </h3>

                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium text-gray-800">
                      Status:
                    </span>{' '}
                    <span
                      className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${
                        character.status === 'Alive'
                          ? 'bg-green-100 text-green-800'
                          : character.status === 'Dead'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {character.status}
                    </span>
                  </p>

                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-800">
                      Species:
                    </span>{' '}
                    {character.species}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between border-t border-gray-200 pt-6">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>

            <span className="text-sm text-gray-700">
              Page <span className="font-medium">{page}</span> of{' '}
              <span className="font-medium">{totalPages}</span>
            </span>

            <button
              onClick={() =>
                setPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={page >= totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CharacterList;