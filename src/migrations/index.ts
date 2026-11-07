import * as migration_20261107_173540_baseline from './20261107_173540_baseline';
import * as migration_20261107_174235_client_onboarding from './20261107_174235_client_onboarding';
import * as migration_20261107_181811_client_credentials from './20261107_181811_client_credentials';

export const migrations = [
  {
    up: migration_20261107_173540_baseline.up,
    down: migration_20261107_173540_baseline.down,
    name: '20261107_173540_baseline',
  },
  {
    up: migration_20261107_174235_client_onboarding.up,
    down: migration_20261107_174235_client_onboarding.down,
    name: '20261107_174235_client_onboarding',
  },
  {
    up: migration_20261107_181811_client_credentials.up,
    down: migration_20261107_181811_client_credentials.down,
    name: '20261107_181811_client_credentials'
  },
];
