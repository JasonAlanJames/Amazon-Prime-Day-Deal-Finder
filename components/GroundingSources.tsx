import React from 'react';

interface GroundingSourcesProps {
  metadata: any;
}

const GroundingSources: React.FC<GroundingSourcesProps> = ({ metadata }) => {
  if (!metadata?.groundingChunks || metadata.groundingChunks.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 pt-8 border-t border-gray-700">
      <h3 className="text-xl font-semibold text-gray-300 mb-4">
        Information Sourced From
      </h3>
      <ul className="list-disc list-inside space-y-2">
        {metadata.groundingChunks.map((chunk: any, index: number) => (
          <li key={index} className="text-gray-400">
            <a
              href={chunk.web.uri}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
            >
              {chunk.web.title || chunk.web.uri}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroundingSources;
