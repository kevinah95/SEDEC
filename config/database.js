module.exports = {
    connection: {
        host: 'localhost',
        user: 'sedec_web_client',
        password: 'root',
        database: 'sedec',
        typeCast: function castField(field, useDefaultTypeCasting) {
            //Thanks to: https://www.bennadel.com/blog/3188-casting-bit-fields-to-booleans-using-the-node-js-mysql-driver.htm
            // We only want to cast bit fields that have a single-bit in them. If the field
            // has more than one bit, then we cannot assume it is supposed to be a Boolean.
            if ((field.type === "BIT") && (field.length === 1)) {
                var bytes = field.buffer();
                // A Buffer in Node represents a collection of 8-bit unsigned integers.
                // Therefore, our single "bit field" comes back as the bits '0000 0001',
                // which is equivalent to the number 1.
                return (bytes[0] === 1);
            }
            if (field.type === "BLOB") {
                var buffer = field.string();
                return buffer;
            }

            return (useDefaultTypeCasting());

        }
    }
};