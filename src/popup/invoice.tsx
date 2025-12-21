// FeesPdf.tsx
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { formatCurrency, formatDate } from "./calculator";
import { BreakdownWithDates } from "./calculator";

Font.register({
  family: "Inter",
  fonts: [
    {
      src: chrome.runtime.getURL("fonts/Inter_18pt-Thin.ttf"),
      fontWeight: "thin",
    },
    {
      src: chrome.runtime.getURL("fonts/Inter_18pt-ThinItalic.ttf"),
      fontWeight: "thin",
      fontStyle: "italic",
    },
    {
      src: chrome.runtime.getURL("fonts/Inter_18pt-ExtraLight.ttf"),
      fontWeight: "ultralight",
    },
    {
      src: chrome.runtime.getURL("fonts/Inter_18pt-ExtraLightItalic.ttf"),
      fontWeight: "ultralight",
      fontStyle: "italic",
    },
    {
      src: chrome.runtime.getURL("fonts/Inter_18pt-Light.ttf"),
      fontWeight: "light",
    },
    {
      src: chrome.runtime.getURL("fonts/Inter_18pt-LightItalic.ttf"),
      fontWeight: "light",
      fontStyle: "italic",
    },
    {
      src: chrome.runtime.getURL("fonts/Inter_18pt-Regular.ttf"),
      fontWeight: "normal",
    },
    {
      src: chrome.runtime.getURL("fonts/Inter_18pt-RegularItalic.ttf"),
      fontWeight: "normal",
      fontStyle: "italic",
    },
    {
      src: chrome.runtime.getURL("fonts/Inter_18pt-Medium.ttf"),
      fontWeight: "medium",
    },
    {
      src: chrome.runtime.getURL("fonts/Inter_18pt-MediumItalic.ttf"),
      fontWeight: "medium",
      fontStyle: "italic",
    },
    {
      src: chrome.runtime.getURL("fonts/Inter_18pt-SemiBold.ttf"),
      fontWeight: "semibold",
    },
    {
      src: chrome.runtime.getURL("fonts/Inter_18pt-SemiBoldItalic.ttf"),
      fontWeight: "semibold",
      fontStyle: "italic",
    },
    {
      src: chrome.runtime.getURL("fonts/Inter_18pt-Bold.ttf"),
      fontWeight: "bold",
    },
    {
      src: chrome.runtime.getURL("fonts/Inter_18pt-BoldItalic.ttf"),
      fontWeight: "bold",
      fontStyle: "italic",
    },
    {
      src: chrome.runtime.getURL("fonts/Inter_18pt-ExtraBold.ttf"),
      fontWeight: "ultrabold",
    },
    {
      src: chrome.runtime.getURL("fonts/Inter_18pt-ExtraBoldItalic.ttf"),
      fontWeight: "ultrabold",
      fontStyle: "italic",
    },
    {
      src: chrome.runtime.getURL("fonts/Inter_18pt-Black.ttf"),
      fontWeight: "heavy",
    },
    {
      src: chrome.runtime.getURL("fonts/Inter_18pt-BlackItalic.ttf"),
      fontWeight: "heavy",
      fontStyle: "italic",
    },
  ],
});

Font.register({
  family: "IBM Plex Mono",
  fonts: [
    {
      src: chrome.runtime.getURL("fonts/IBMPlexMono-Thin.ttf"),
      fontWeight: "thin",
    },
    {
      src: chrome.runtime.getURL("fonts/IBMPlexMono-ThinItalic.ttf"),
      fontWeight: "thin",
      fontStyle: "italic",
    },
    {
      src: chrome.runtime.getURL("fonts/IBMPlexMono-ExtraLight.ttf"),
      fontWeight: "ultralight",
    },
    {
      src: chrome.runtime.getURL("fonts/IBMPlexMono-ExtraLightItalic.ttf"),
      fontWeight: "ultralight",
      fontStyle: "italic",
    },
    {
      src: chrome.runtime.getURL("fonts/IBMPlexMono-Light.ttf"),
      fontWeight: "light",
    },
    {
      src: chrome.runtime.getURL("fonts/IBMPlexMono-LightItalic.ttf"),
      fontWeight: "light",
      fontStyle: "italic",
    },
    {
      src: chrome.runtime.getURL("fonts/IBMPlexMono-Medium.ttf"),
      fontWeight: "medium",
    },
    {
      src: chrome.runtime.getURL("fonts/IBMPlexMono-MediumItalic.ttf"),
      fontWeight: "medium",
      fontStyle: "italic",
    },
    {
      src: chrome.runtime.getURL("fonts/IBMPlexMono-SemiBold.ttf"),
      fontWeight: "semibold",
    },
    {
      src: chrome.runtime.getURL("fonts/IBMPlexMono-SemiBoldItalic.ttf"),
      fontWeight: "semibold",
      fontStyle: "italic",
    },
    {
      src: chrome.runtime.getURL("fonts/IBMPlexMono-Bold.ttf"),
      fontWeight: "bold",
    },
    {
      src: chrome.runtime.getURL("fonts/IBMPlexMono-BoldItalic.ttf"),
      fontWeight: "bold",
      fontStyle: "italic",
    },
    {
      src: chrome.runtime.getURL("fonts/IBMPlexMono-ExtraBold.ttf"),
      fontWeight: "ultrabold",
    },
    {
      src: chrome.runtime.getURL("fonts/IBMPlexMono-ExtraBoldItalic.ttf"),
      fontWeight: "ultrabold",
      fontStyle: "italic",
    },
    {
      src: chrome.runtime.getURL("fonts/IBMPlexMono-Regular.ttf"),
      fontWeight: "normal",
    },
    {
      src: chrome.runtime.getURL("fonts/IBMPlexMono-Italic.ttf"),
      fontWeight: "normal",
      fontStyle: "italic",
    },
  ],
});

const colors = {
  slate1: "#fcfcfd",
  slate2: "#f9f9fb",
  slate3: "#f0f0f3",
  slate4: "#e8e8ec",
  slate5: "#e0e1e6",
  slate6: "#d9d9e0",
  slate7: "#cdced6",
  slate8: "#b9bbc6",
  slate9: "#8b8d98",
  slate10: "#80838d",
  slate11: "#60646c",
  slate12: "#1c2024",
} as const;

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 10,
    fontFamily: "Inter",
    color: colors.slate12,
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
    fontFamily: "Inter",
    color: colors.slate12,
  },
  gutter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  invoiceDate: {
    fontFamily: "Inter",
    color: colors.slate12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 32,
    marginTop: 8,
    marginBottom: 32,
  },
  headerTo: {
    flexDirection: "column",
    gap: 4,
    maxWidth: "40%",
  },
  headerFrom: {
    flexDirection: "column",
    gap: 4,
    maxWidth: "30%",
  },
  abnText: {
    fontWeight: "bold",
    marginTop: 8,
    fontFamily: "Inter",
    color: colors.slate12,
  },
  headerLabel: {
    color: colors.slate11,
    textTransform: "uppercase",
    fontFamily: "Inter",
  },
  headerToName: {
    fontWeight: "bold",
    marginBottom: 2,
    fontFamily: "Inter",
    color: colors.slate12,
  },
  headerToAddress: {
    opacity: 0.8,
    fontFamily: "Inter",
    color: colors.slate11,
  },
  table: {
    borderWidth: 1,
    borderColor: colors.slate6,
  },
  footer: {
    marginTop: 32,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerLeftSection: {
    width: "60%",
    paddingRight: 16,
  },
  footerRightSection: {
    width: "40%",
  },
  summaryTable: {
    backgroundColor: colors.slate2,
    padding: 2,
    paddingBottom: 4,
  },
  headerRow: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: colors.slate2,
    borderBottomWidth: 1,
    borderColor: colors.slate6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerRowText: {
    fontWeight: "bold",
    fontFamily: "Inter",
    color: colors.slate12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  valueSpan: {
    textAlign: "right",
    fontVariant: ["tabular-nums"],
    fontFamily: "IBM Plex Mono",
    color: colors.slate12,
    fontWeight: "medium",
  },
  finalValueLabel: {
    fontWeight: "bold",
    fontFamily: "Inter",
    color: colors.slate12,
  },
  finalValueSpan: {
    fontWeight: "bold",
    fontFamily: "IBM Plex Mono",
    color: colors.slate12,
  },
  bigValueSpan: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "IBM Plex Mono",
    color: colors.slate12,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderColor: colors.slate6,
  },
  notesTitle: {
    fontWeight: "bold",
    marginBottom: 10,
    textTransform: "uppercase",
    fontFamily: "Inter",
    color: colors.slate12,
  },
  noticeText: {
    opacity: 0.8,
    fontFamily: "Inter",
    color: colors.slate12,
  },
  noticeMargin: {
    marginBottom: 10,
  },
  itemKey: {
    fontWeight: "bold",
    fontFamily: "Inter",
    marginRight: 24,
    textTransform: "uppercase",
    color: colors.slate12,
  },
  itemSup: {
    fontSize: 8,
    fontFamily: "Inter",
    fontWeight: "bold",
    textAlignVertical: "top",
    color: colors.slate12,
  },
});

export function InvoicePdf(props: BreakdownWithDates) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.gutter}>
          <Text style={styles.title}>Invoice</Text>
          <Text style={styles.invoiceDate}>Date: {formatDate()}</Text>
        </View>

        <View style={styles.header}>
          <View style={styles.headerTo}>
            <Text style={styles.headerLabel}>Bill To:</Text>
            <Text style={styles.headerToName}>Duncraig smiles</Text>
            <Text style={styles.headerToAddress}>
              4/57 Arnisdale Rd, Duncraig WA 6023, Australia
            </Text>
          </View>
          <View style={styles.headerFrom}>
            <Text style={styles.headerToName}>Dr. Christopher Cunningham</Text>
            <Text style={styles.headerToAddress}>
              5 Pittwater CI, kallaroo WA 6025, Australia
            </Text>
            <Text style={styles.abnText}>ABN: 70710286876</Text>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={styles.headerRowText}>Description</Text>
            <Text style={styles.headerRowText}>Amount</Text>
          </View>
          <View style={[styles.row, styles.rowBorder]}>
            <Text>
              Total collection ({formatDate(props.startDate)} -{" "}
              {formatDate(props.endDate)})
            </Text>
            <Text style={styles.valueSpan}>
              {formatCurrency(props.totalCollection)}
            </Text>
          </View>
          <View style={[styles.row, styles.rowBorder]}>
            <Text>Lab bills</Text>
            <Text style={styles.valueSpan}>
              {formatCurrency(0 - props.labFees)}
            </Text>
          </View>
          <View style={[styles.row, styles.rowBorder]}>
            <Text>Collection after lab bills</Text>
            <Text style={styles.valueSpan}>
              {formatCurrency(props.receiptsAfterLab)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text>
              42% of collection after lab bills
              <Text style={styles.itemSup}>*</Text>
            </Text>
            <Text style={styles.valueSpan}>
              {formatCurrency(props.providerShareGross)}
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.footerLeftSection}>
            <Text style={styles.notesTitle}>Notes:</Text>
            <Text style={styles.noticeText}>
              GST is withheld by NKRD PTY LTD and remitted to ATO.
            </Text>
            <Text style={[styles.noticeText, styles.noticeMargin]}>
              Dr. Cunningham may claim the GST credit in their BAS.
            </Text>
            <Text style={styles.noticeText}>
              <Text style={styles.itemSup}>*</Text> 42% includes superannuation
              & GST.
            </Text>
          </View>
          <View style={styles.footerRightSection}>
            <View style={styles.summaryTable}>
              <View style={styles.footerRow}>
                <Text>Subtotal</Text>
                <Text style={[styles.valueSpan, styles.finalValueSpan]}>
                  {formatCurrency(props.providerShareGross)}
                </Text>
              </View>
              <View style={[styles.footerRow, styles.rowBorder]}>
                <Text>GST withheld (10%)</Text>
                <Text style={styles.valueSpan}>
                  {formatCurrency(0 - props.gstComponent)}
                </Text>
              </View>
              <View style={styles.footerRow}>
                <Text style={styles.finalValueLabel}>TOTAL</Text>
                <Text
                  style={[
                    styles.valueSpan,
                    styles.finalValueSpan,
                    styles.bigValueSpan,
                  ]}
                >
                  {formatCurrency(props.providerNetPayable)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
