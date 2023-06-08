    //
    // Summary:
    //     Specifies the culture, case, and sort rules to be used by certain overloads of
    //     the System.String.Compare(System.String,System.String) and System.String.Equals(System.Object)
    //     methods.
    export enum StringComparison
    {
        //
        // Summary:
        //     Compare strings using culture-sensitive sort rules and the current culture.
        CurrentCulture = 0,
        //
        // Summary:
        //     Compare strings using culture-sensitive sort rules, the current culture, and
        //     ignoring the case of the strings being compared.
        CurrentCultureIgnoreCase = 1,
        //
        // Summary:
        //     Compare strings using culture-sensitive sort rules and the invariant culture.
        InvariantCulture = 2,
        //
        // Summary:
        //     Compare strings using culture-sensitive sort rules, the invariant culture, and
        //     ignoring the case of the strings being compared.
        InvariantCultureIgnoreCase = 3,
        //
        // Summary:
        //     Compare strings using ordinal (binary) sort rules.
        Ordinal = 4,
        //
        // Summary:
        //     Compare strings using ordinal (binary) sort rules and ignoring the case of the
        //     strings being compared.
        OrdinalIgnoreCase = 5
    }