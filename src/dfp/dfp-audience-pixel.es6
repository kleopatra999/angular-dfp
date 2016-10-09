/**
 * @file Defines the `dfp-audience-pixel` directive.
 * @author Peter Goldsborough <peter@goldsborough.me>
 * @license MIT
 */

(function(module) {
  /**
   *
   * The `dfp-audience-pixel` tag.
   *
   * Audience pixels are useful for getting audience impressions on parts of a
   * page that do not show ads. Usually, audience impressions are generated when
   * a user sees an ad (unit) and is then eventually added to that audience
   * segmenet. However, when you have no ads but still want to record an
   * impression for an audience segment, you can add a transparent 1x1 pixel to
   * do so.
   *
   * @see [Google DFP Support]{@link https://support.google.com/dfp_premium/answer/2508388?hl=en}
   *
   * @param {Object} scope The angular scope.
   * @param {Object} element The HTML element on which the directive is defined.
   * @param {Object} attributes The attributes of the element.
   */
  function dfpAudiencePixelDirective(scope, element, attributes) {
    const axel = String(Math.random());
    const random = axel * 10000000000000;

    let adUnit = '';
    if (scope.adUnit) {
      adUnit = `dc_iu=${scope.adUnit}`;
    }

    let ppid = '';
    if (scope.ppid) {
      ppid = `ppid=${scope.ppid}`;
    }

    const pixel = document.createElement('img');

    pixel.src = 'https://pubads.g.doubleclick.net/activity;ord=';
    pixel.src += `${random};dc_seg=${scope.segmentId};${adUnit}${ppid}`;

    pixel.width = 1;
    pixel.height = 1;
    pixel.border = 0;
    pixel.style.visibility = 'hidden';

    element.append(pixel);
  }

  module.directive('dfpAudiencePixel', [() => {
    return {
      restrict: 'E',
      scope: {adUnit: '@', segmentId: '@', ppid: '@'},
      link: dfpAudiencePixelDirective
    };
  }]);

// eslint-disable-next-line
})(angularDfp);