import * as api from '@lp-labs/utc-date-range';
import { dateRange } from '@lp-labs/utc-date-range';
console.log(dateRange('2024-02-28', '2024-03-01'));
// @ts-expect-error invalid argument must be rejected by declarations
api.dateRange(20240101, '2024-01-02');
