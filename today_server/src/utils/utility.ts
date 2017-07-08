export let address2ip = function(address: string): string {
    if (address.indexOf('::ffff:') != -1) {
        address = address.substr(7);
    }
    return address;
}
