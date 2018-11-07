package streama;
import java.awt.Color;
import java.util.Random;

class ColorHelper {

  private final static String toHexString(Color colour) throws NullPointerException {
    String hexColour = Integer.toHexString(colour.getRGB() & 0xffffff);
    if (hexColour.length() < 6) {
      hexColour = "000000".substring(0, 6 - hexColour.length()) + hexColour;
    }
    return "#" + hexColour;
  }

  public static String generateHexColorDarker() {
    Color color = Color.getHSBColor(new Random().nextFloat(), new Random().nextFloat(), new Random().nextFloat());
    return toHexString(color.darker());
  }
}
