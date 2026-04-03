import { useSessionStorage } from '@uidotdev/usehooks';
import { FlaskConical, Link, Minus } from 'lucide-react';
import { useState } from 'react';

const campaigns = window.ba_tester.campaignsData;

const abTesterCampaignId = 'ab_tester_campaign_id';
const abTesterVariationId = 'ab_tester_variation_id';
const abTesterIgnoreRequirements = 'ab_tester_ignore_requirements';
const abTesterCallDebugPanel = 'ab_tester_call_debug_panel';

const FloatingWidget = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  const [campaignId, setCampaignId] = useSessionStorage<number | null>(abTesterCampaignId, null);
  const [variationId, setVariationId] = useSessionStorage<number | null>(abTesterVariationId, null);
  const [ignoreRequirements, setIgnoreRequirements] = useSessionStorage<boolean>(abTesterIgnoreRequirements, false);

  if (isMinimized) {
    return (
      <button
        type="button"
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full shadow-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center cursor-pointer"
        aria-label="Expandir widget"
      >
        <FlaskConical className="h-5 w-5" />
      </button>
    );
  }

  const campaignSelected = campaigns.find((campaign) => campaign.id === campaignId);

  const onCopy = async () => {
    const url = new URL(location.href);
    if (campaignId === null || variationId === null) return;

    url.searchParams.set(abTesterCampaignId, String(campaignId));
    url.searchParams.set(abTesterVariationId, String(variationId));
    url.searchParams.set(abTesterIgnoreRequirements, String(ignoreRequirements));
    url.searchParams.delete(abTesterCallDebugPanel);

    navigator.clipboard.writeText(url.toString());
  };

  const applyChanges = () => {
    const url = new URL(location.href);
    if (campaignId === null || variationId === null) return;

    url.searchParams.set(abTesterCampaignId, String(campaignId));
    url.searchParams.set(abTesterVariationId, String(variationId));
    url.searchParams.set(abTesterIgnoreRequirements, String(ignoreRequirements));
    url.searchParams.set(abTesterCallDebugPanel, String(true));

    location.href = url.toString();
  }


  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 rounded-xl border border-blue-200 bg-white shadow-2xl transition-all duration-300 ease-in-out">
      <div className="flex items-center justify-between bg-blue-600 rounded-t-xl px-4 py-3">
        <span className="text-sm font-semibold text-white">Configuración BA Tester</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="h-7 w-7 rounded-md text-blue-200 enabled:hover:text-white enabled:hover:bg-blue-700 flex items-center justify-center transition-colors enabled:cursor-pointer disabled:opacity-50"
            onClick={onCopy}
            disabled={campaignId === null || variationId === null}
          >
            <Link className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="h-7 w-7 rounded-md text-blue-200 enabled:hover:text-white enabled:hover:bg-blue-700 flex items-center justify-center transition-colors cursor-pointer"
            onClick={() => setIsMinimized(true)}
            aria-label="Minimizar"
          >
            <Minus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="select1" className="text-xs font-medium text-blue-500">
            Campaign
          </label>
          <select
            id="select1"
            value={String(campaignId)}
            onChange={(e) => {
              setVariationId(null);
              setCampaignId(Number(e.target.value));
            }}
            className="w-full rounded-lg border border-blue-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          >
            <option value="null" disabled>
              Seleccionar...
            </option>

            {campaigns.map((campaign) => (
              <option key={campaign.id} value={campaign.id}>
                {campaign.name}
              </option>
            ))}
          </select>
        </div>

        {campaignSelected && (
          <div className="flex flex-col gap-1.5">
            <label htmlFor="select2" className="text-xs font-medium text-blue-500">
              Variation
            </label>
            <select
              id="select2"
              onChange={(e) => setVariationId(Number(e.target.value))}
              value={String(variationId)}
              className="w-full rounded-lg border border-blue-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option value="null" disabled>
                Seleccionar...
              </option>
              {campaignSelected.variations.map((variation) => (
                <option key={variation.id} value={variation.id}>
                  {variation.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <label htmlFor="check1" className="flex items-center gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            id="check1"
            checked={ignoreRequirements}
            onChange={(e) => setIgnoreRequirements(e.target.checked)}
            className="h-4 w-4 rounded border-blue-300 text-blue-600 focus:ring-blue-500 accent-blue-600"
          />
          <span className="text-sm font-medium text-gray-800">Ignorar requisitos</span>
        </label>

        <button
          type="button"
          className="w-full mt-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 active:bg-blue-800 transition-colors cursor-pointer"
          onClick={applyChanges}
        >
          Aplicar
        </button>
      </div>
    </div>
  );
};

export default FloatingWidget;
