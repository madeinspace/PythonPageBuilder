import { sqlConnection } from '../../utils/sql';
import { formatNumber } from '../../utils';
import Page from './page';

const fetchData = async ({ filters }) => {
  const { ClientID, WebID, IGBMID } = filters;

  const tableData = await sqlConnection.raw(%(queryName)sSQL({ ClientID, WebID, IGBMID }));

  return tableData;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => '%(PageAlias)s',
    },
    {
      Title: 'Headline',
      renderString: ({ data, tableData }): string =>
        `Fusce magna ligula, dignissim mammasay mammasa mamma oo sa amet, fringilla eget, dang shizznit`,
    },
    {
      Title: 'Description',
      renderString: ({ data, tableData }): string =>
        `<p>Its fo rizzle ipsum dolor sit ghetto, dawg adipiscing elizzle. Nullam mofo fo shizzle my nizzle, bling bling volutpizzle, suscipit you son of a bizzle, shizzle my nizzle crocodizzle vizzle, the bizzle. Pellentesque eget tortizzle. Sizzle black. Check it out brizzle you son of a bizzle dapibus turpizzle boofron mah nizzle. Maurizzle pellentesque boom shackalack izzle turpis. We gonna chung izzle tortor. Pellentesque eleifend rhoncizzle shiznit. In izzle habitasse platea dictumst. Crazy dapibizzle. Uhuh ... yih! tellizzle urna, pretium things, shiznit dang, crackalackin vitae, nunc. Shizznit suscipit. Integizzle sempizzle pizzle sed purizzle.</p>`,
    },
  ],
  filterToggles: [
    // put toggle objects here
  ],
};

export { fetchData, Page, pageContent };

const %(queryName)sSQL = ({ ClientID, WebID, IGBMID }) => `
  select * from CommData_Economy.[dbo].[fn_IN_ERPPivot](${+ClientID},${+WebID},${+IGBMID}) ORDER BY Year DESC
`;
