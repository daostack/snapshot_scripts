import { getInstance } from '@snapshot-labs/lock/plugins/vue';
import {
  signMessage
} from '@snapshot-labs/snapshot.js/src/utils/web3';
//import { version } from './package.json';

const rootStateAccount = "0xlatif"
const space =  "latif.eth"
const type = "proposal"
const version = "0.1"

const payload = {
  name:"oren proposal",
  body: 'desc',
  choices: [1,2],
  start: '1609851593',
  end: '1609951593',
  snapshot: '11594637',
  metadata: {}
}

async function  sendProposal() {
    const auth = getInstance();
    //commit('SEND_REQUEST');
    try {
      const msg : any= {
        address: rootStateAccount,
        msg: JSON.stringify({
          version,
          timestamp: (Date.now() / 1e3).toFixed(),
          space,
          type,
          payload
        })
      };
      msg.sig = await signMessage(auth.web3, msg.msg, rootStateAccount);
      console.log(msg)
    //  const result = await client.request('message', msg);
      //return result;
    } catch (e) {
      const errorMessage =
        e && e.error_description
          ? `Oops, ${e.error_description}`
          : 'Oops, something went wrong!';
      return;
    }
  }
module.exports = { sendProposal }
